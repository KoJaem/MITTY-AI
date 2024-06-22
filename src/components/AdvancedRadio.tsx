interface Option {
  title: string;
  subtitle: string;
  id: string;
  value: string | readonly string[] | number | undefined;
}

interface Params {
  title: string;
  options: Array<Option>;
}

export default function AdvancedRadio({ title, options }: Params) {
  return (
    <>
      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
      <ul className="grid w-full gap-6 md:grid-cols-2">
        {options.map(option => (
          <li key={`${option.id}-${option.title}`}>
            <input
              type="radio"
              id={option.id}
              name={option.id}
              value={option.value}
              className="hidden peer"
              required
            />
            <label
              htmlFor="hosting-small"
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold">
                  {option.title}
                </div>
                <div className="w-full">{option.subtitle}</div>
              </div>
              <svg
                className="w-5 h-5 ms-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
