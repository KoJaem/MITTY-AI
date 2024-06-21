
interface Params {
  text?: string;
}
export default function Loading({ text }: Params) {
  return (
    <div className="flex w-full items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
        {text ? text : "Loading..."}
      </div>
    </div>
  );
}
