from flask import Flask, request, jsonify
import joblib
import re
import logging

# Flask 애플리케이션 생성
app = Flask(__name__)

# 로깅 설정
logging.basicConfig(level=logging.INFO)

# 저장된 모델 및 벡터화기 로드
try:
    svm_model = joblib.load('./model/svm_model.pkl')
    vectorizer = joblib.load('./model/vectorizer.pkl')
    logging.info("모델과 벡터화기가 성공적으로 로드되었습니다.")
except Exception as e:
    logging.error(f"모델 또는 벡터화기 로드 오류: {e}")
    svm_model = None
    vectorizer = None

# 데이터 전처리 함수
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 ]', '', text)
    return text

@app.route('/kr-bad-word-predict', methods=['POST'])
def predict():
    if not svm_model or not vectorizer:
        return jsonify({'error': '모델 또는 벡터화기가 제대로 로드되지 않았습니다.'}), 500

    if request.content_type != 'application/json':
        return jsonify({'error': 'Content-Type은 application/json이어야 합니다.'}), 400

    data = request.json
    text = data.get('text', '')

    # 텍스트 전처리
    preprocessed_text = preprocess_text(text)

    # 벡터화
    try:
        text_vectorized = vectorizer.transform([preprocessed_text])
    except Exception as e:
        logging.error(f"텍스트 벡터화 중 오류 발생: {e}")
        return jsonify({'error': '텍스트 벡터화에 실패했습니다.'}), 500

    # 예측
    try:
        prediction = svm_model.predict(text_vectorized)
        is_profanity = bool(prediction[0])
    except Exception as e:
        logging.error(f"예측 중 오류 발생: {e}")
        return jsonify({'error': '예측에 실패했습니다.'}), 500

    return jsonify({'text': text, 'is_profanity': is_profanity})

if __name__ == '__main__':
    app.run(debug=True)
