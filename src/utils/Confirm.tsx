import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
export function Confirm({
  title,
  message,
  onClick,
}: {
  title: string;
  message: string;
  onClick: () => void;
}) {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui">
          <div className="font-galmuri font-lg">{title}</div>
          <p className="text-center font-sm">{message}</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-4 py-2 mr-2 text-black"
              onClick={() => {
                onClick();
                onClose();
              }}
            >
              네
            </button>
            <button className="px-4 ml-2 py-2" onClick={onClose}>
              아니요
            </button>
          </div>
        </div>
      );
    },
  });
}

export default Confirm;
