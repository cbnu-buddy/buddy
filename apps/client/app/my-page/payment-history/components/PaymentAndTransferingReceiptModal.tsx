import { Modal } from 'flowbite-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { formatDateTime } from '@/utils/formatDate';

interface PaymentAndTransferingInfoType {
  category: string;
  item: string;
  amount: number;
  createTime: string;
}

interface PaymentAndTransferingReceiptModalProps {
  openPaymentAndTransferingReceiptModal: string | undefined;
  setOpenPaymentAndTransferingReceiptModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  paymentAndTransferingReceiptInfo: PaymentAndTransferingInfoType | undefined;
}

export default function PaymentAndTransferingReceiptModal({
  openPaymentAndTransferingReceiptModal,
  setOpenPaymentAndTransferingReceiptModal,
  paymentAndTransferingReceiptInfo,
}: PaymentAndTransferingReceiptModalProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Modal
      size='sm'
      show={openPaymentAndTransferingReceiptModal === 'default'}
      data-aos='fade-zoom'
      data-aos-duration='300'
      onClose={() => setOpenPaymentAndTransferingReceiptModal(undefined)}
    >
      <Modal.Header className='border-none pb-0 flex items-center' />
      <Modal.Body className='flex flex-col pt-2 pb-6 spacing-y-28'>
        <p className='text-lg font-medium'>
          {paymentAndTransferingReceiptInfo?.item || '결제 정보'}
        </p>

        <p className='text-[0.5rem] mt-1 text-[#656565] font-light tracking-tighter'>
          {paymentAndTransferingReceiptInfo
            ? formatDateTime(paymentAndTransferingReceiptInfo.createTime)
            : ''}
        </p>

        <p className='mt-6 text-lg font-semibold'>
          {paymentAndTransferingReceiptInfo
            ? Number(paymentAndTransferingReceiptInfo.amount).toLocaleString()
            : 0}
          원
        </p>

        <div className='mt-3 py-4 border-y flex gap-x-[0.05rem]'>
          <span className='text-xs font-semibold'>
            {paymentAndTransferingReceiptInfo?.category === 'point'
              ? paymentAndTransferingReceiptInfo?.amount
              : '계좌 송금'}
          </span>
          {paymentAndTransferingReceiptInfo?.category === 'point' && (
            <span className='text-xs font-semibold'>P</span>
          )}
        </div>

        <div className='mb-3 border-b py-5 flex flex-col gap-y-2'>
          <div className='font-light'>
            <div className='flex justify-between items-center text-[#656565]'>
              <span className='text-[0.5rem] text-inherit'>공급가액</span>
              <span className='text-[0.5rem] tracking-tighter'>
                {paymentAndTransferingReceiptInfo
                  ? Number(
                      paymentAndTransferingReceiptInfo.amount * 0.91
                    ).toLocaleString()
                  : 0}
                원
              </span>
            </div>

            <div className='flex justify-between items-center text-[#656565]'>
              <span className='text-[0.5rem] text-inherit'>부가세</span>
              <span className='text-[0.5rem] tracking-tighter'>
                {paymentAndTransferingReceiptInfo
                  ? Number(
                      paymentAndTransferingReceiptInfo.amount * 0.09
                    ).toLocaleString()
                  : 0}
                원
              </span>
            </div>
          </div>

          <div className='mt-2 flex justify-between items-center'>
            <span className='text-[0.5rem] text-[#656565] font-light'>
              합계
            </span>
            <span className='text-[0.5rem] tracking-tighter font-semibold'>
              {paymentAndTransferingReceiptInfo
                ? Number(
                    paymentAndTransferingReceiptInfo.amount
                  ).toLocaleString()
                : 0}
              원
            </span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
