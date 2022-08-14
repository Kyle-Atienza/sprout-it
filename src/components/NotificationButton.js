import {
  BellOutlined
} from "@ant-design/icons";

export const NotificationButton = ({ notifications, onClick, className }) => (
  <>
    <button
      className={`w-12 h-12 rounded-full bg-light-100 hover:bg-light-200 shadow transition-all ${className}`}
      onClick={onClick}
    >
      <BellOutlined />
    </button>
  </>
);
