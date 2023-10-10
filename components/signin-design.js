import { uid } from "@utils/uid";
export function FormContainer({ children }) {
  return (
    <div className=" bg-white bg-opacity-80 rounded-3xl border border-neutral-300 py-8 px-5">
      {children}
    </div>
  );
}
export function FormHeader({ title, text }) {
  return (
    <div className="">
      <h3 className="text-black text-3xl font-semibold mb-3">{title}</h3>
      <span className="text-black text-base font-normal">{text}</span>
    </div>
  );
}
export function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mt-3">
      {children}
    </form>
  );
}

export function NumericInput({ placeholder, labeled = "", value, onChange }) {
  const id = uid();
  return (
    <div className="w-full mt-3">
      {labeled && (
        <label className="text-slate-800" htmlFor={id}>
          {labeled}
        </label>
      )}
      <input
        type="number"
        id={id}
        placeholder={placeholder}
        className="w-full rounded-lg text-base font-semibold placeholder:text-gray-400 shadow-lg py-4 px-3 focus:outline-none focus:shadow-xl text-black"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function SubmitForm({ disabled, title }) {
  return (
    <div className="px-10">
      <button
        type="submit"
        disabled={disabled}
        className={`rounded-full bg-primary text-white py-5 mt-8 w-full  ${
          disabled
            ? "bg-opacity-50 cursor-not-allowed flex justify-center items-center"
            : "hover:bg-secondary"
        }`}
      >
        {disabled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M22 12c0-5.523-4.477-10-10-10" stroke="black">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 12 12"
                to="360 12 12"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        ) : (
          title
        )}
      </button>
    </div>
  );
}
