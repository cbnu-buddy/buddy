export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export const formatDateTime = (dateTimeString: string): string => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = daysOfWeek[date.getDay()];

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}.${month}.${day}(${dayOfWeek}) ${hours}:${minutes}:${seconds}`;
};

export function timeAgo(dateTimeString: string): string {
  const now = new Date();
  const past = new Date(dateTimeString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  // 1분(60초) 이하인 경우에는 '방금 전' 반환
  if (diffInSeconds < 60) {
    return '방금 전';
  }

  const units: { name: string; seconds: number }[] = [
    { name: '년', seconds: 60 * 60 * 24 * 365 },
    { name: '달', seconds: 60 * 60 * 24 * 30 },
    { name: '일', seconds: 60 * 60 * 24 },
    { name: '시간', seconds: 60 * 60 },
    { name: '분', seconds: 60 },
    { name: '초', seconds: 1 },
  ];

  for (let unit of units) {
    const quotient = Math.floor(diffInSeconds / unit.seconds);
    if (quotient > 0) {
      return `${quotient}${unit.name} 전`;
    }
  }

  // 모든 단위에서 0이 반환된 경우 "방금 전" 반환
  return '방금 전';
}

export function formatDateAndTimeAgo(dateTimeString: string): string {
  const now = new Date();
  const past = new Date(dateTimeString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  const diffInHours = diffInSeconds / 3600;

  // 하루(24시간) 이내의 경우 "~초/분/시 전"으로 반환
  if (diffInHours < 24) {
    const units: { name: string; seconds: number }[] = [
      { name: '년', seconds: 60 * 60 * 24 * 365 },
      { name: '달', seconds: 60 * 60 * 24 * 30 },
      { name: '일', seconds: 60 * 60 * 24 },
      { name: '시간', seconds: 60 * 60 },
      { name: '분', seconds: 60 },
      { name: '초', seconds: 1 },
    ];

    for (let unit of units) {
      const quotient = Math.floor(diffInSeconds / unit.seconds);
      if (quotient > 0) {
        return `${quotient}${unit.name} 전`;
      }
    }

    // 모든 단위에서 0이 반환된 경우 "방금 전" 반환
    return '방금 전';
  }

  // 하루 이상된 경우 "YYYY.MM.DD" 형식으로 반환
  const year = past.getFullYear();
  const month = String(past.getMonth() + 1).padStart(2, '0');
  const day = String(past.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
