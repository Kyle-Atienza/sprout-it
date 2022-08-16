import { QuestionOutlined } from "@ant-design/icons";

export const HelpButton = ({ className }) => (
  <>
    <a href='/help'>
      <button
        className={`w-12 h-12 rounded-full bg-light-100 hover:bg-light-200 shadow transition-all ${className}`}
      >
        <QuestionOutlined />
      </button>
    </a>
  </>
);
