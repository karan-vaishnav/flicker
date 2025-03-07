export function Footer() {
  return (
    <div className="flex justify-between text-black p-2 w-full font-text text-2xl items-center">
      <h1>Flicker</h1>
      <p>Developed by Karan 🖤</p>
      <div className="flex gap-4">
        <div className="cursor-pointer">
          <svg
            width="24px"
            height="24px"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div className="cursor-pointer">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M16.8198 20.7684L3.75317 3.96836C3.44664 3.57425 3.72749 3 4.22678 3H6.70655C6.8917 3 7.06649 3.08548 7.18016 3.23164L20.2468 20.0316C20.5534 20.4258 20.2725 21 19.7732 21H17.2935C17.1083 21 16.9335 20.9145 16.8198 20.7684Z"
              stroke="#000000"
              stroke-width="1.5"
            ></path>
            <path
              d="M20 3L4 21"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
