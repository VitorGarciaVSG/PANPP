
import React from 'react';

interface ErrorMessageProps {
  errorList: string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorList }) => {
  if (errorList.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
      <strong className="font-bold">Erro de preenchimento!</strong>
      <ul className="list-disc list-inside mt-2 text-sm">
        {errorList.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    </div>
  );
};

export default ErrorMessage;
