import { UpOutlined } from "@ant-design/icons";

export const BackToTopButton = ({ className }) => (
  <>
    <a href='#top' className='fixed bottom-2 right-2'>
      <button
        className={`w-12 h-12 rounded-full bg-light-100 hover:bg-light-200 shadow transition-all ${className}`}
      >
        <UpOutlined className='mb-2' />
      </button>
    </a>
  </>
);
