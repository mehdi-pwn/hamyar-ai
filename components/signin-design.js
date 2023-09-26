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
        className="w-full rounded-lg text-base font-semibold placeholder:text-gray-400 shadow-lg py-4 px-3 focus:outline-none focus:shadow-xl"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function SubmitForm({ title }) {
  return (
    <div className="px-10">
      <input
        type="submit"
        value={title}
        className="rounded-full bg-primary text-white py-5 mt-8 w-full hover:bg-secondary hover:cursor-pointer"
      />
    </div>
  );
}
