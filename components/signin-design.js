import { uid } from "@utils/uid";
export function FormContainer({ children }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F4F6F8" }}>
      <div className="container mx-auto py-20">
        <div className=" w-6/12 mx-auto bg-white rounded-3xl border border-neutral-300 py-8 px-5">
          {children}
        </div>
      </div>
    </div>
  );
}
export function FormHeader({ title, text }) {
  return (
    <div className="mt-6">
      <h3 className="text-black text-4xl font-semibold mb-3">{title}</h3>
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
export function Row({ children, cols = 2 }) {
  return <div className={` grid grid-cols-${cols} gap-2`}>{children}</div>;
}
export function TextInput({ placeholder, labeled = "", value, onChange }) {
  const id = uid();
  return (
    <div className="w-full mt-3">
      {labeled && (
        <label className="text-slate-800" htmlFor={id}>
          {labeled}
        </label>
      )}
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="border w-full rounded-md border-neutral-300 text-base font-semibold placeholder:text-gray-400 shadow mt-2 py-4 px-3 focus:outline-none focus:shadow-xl"
        value={value}
        onChange={onChange}
      />
    </div>
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
        className="border w-full rounded-md border-neutral-300 text-base font-semibold placeholder:text-gray-400 shadow mt-2 py-4 px-3 focus:outline-none focus:shadow-xl"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
export function PasswordInput({ placeholder, labeled = "", value, onChange }) {
  const id = uid();
  return (
    <div className="w-full mt-3">
      {labeled && (
        <label className="text-slate-800" htmlFor={id}>
          {labeled}
        </label>
      )}
      <input
        type="password"
        id={id}
        placeholder={placeholder}
        className="border w-full rounded-md border-neutral-300 text-base font-semibold placeholder:text-gray-400 shadow mt-2 py-4 px-3 focus:outline-none focus:shadow-xl"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
export function SelectBox({ labeled = "", value, onChange, children }) {
  const id = uid();
  return (
    <div className="w-full mt-3">
      {labeled && (
        <label className="text-slate-800" htmlFor={id}>
          {labeled}
        </label>
      )}
      <div>
        <select
          id={id}
          class="border w-full rounded-md border-neutral-300 leading-tight text-base font-semibold text-gray-400 shadow mt-2 py-4 px-3 focus:outline-none focus:shadow-xl"
        >
          {children}
        </select>
      </div>
    </div>
  );
}
export function Option({ value, children }) {
  return <option value={value}>{children}</option>;
}
export function SubmitForm({ title }) {
  return (
    <div>
      <input
        type="submit"
        value={title}
        className="rounded-md bg-blue-500 text-white text-2xl font-semibold py-5 mt-8 w-full hover:bg-blue-700 hover:cursor-pointer"
      />
    </div>
  );
}
