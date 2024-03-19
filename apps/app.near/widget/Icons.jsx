const LinkIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M6.00065 11.3337H4.66732C3.78326 11.3337 2.93542 10.9825 2.3103 10.3573C1.68517 9.73223 1.33398 8.88438 1.33398 8.00033C1.33398 7.11627 1.68517 6.26842 2.3103 5.6433C2.93542 5.01818 3.78326 4.66699 4.66732 4.66699H6.00065"
      stroke={theme === "light" ? "#11181C" : "#fff"}
      stroke-width="1.33"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 4.66699H11.3333C12.2174 4.66699 13.0652 5.01818 13.6904 5.6433C14.3155 6.26842 14.6667 7.11627 14.6667 8.00033C14.6667 8.88438 14.3155 9.73223 13.6904 10.3573C13.0652 10.9825 12.2174 11.3337 11.3333 11.3337H10"
      stroke={theme === "light" ? "#11181C" : "#fff"}
      stroke-width="1.33"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.33398 8H10.6673"
      stroke={theme === "light" ? "#11181C" : "#fff"}
      stroke-width="1.33"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g clip-path="url(#clip0_208_79881)">
      <path
        d="M13.334 5.33301H6.66732C5.93094 5.33301 5.33398 5.92996 5.33398 6.66634V13.333C5.33398 14.0694 5.93094 14.6663 6.66732 14.6663H13.334C14.0704 14.6663 14.6673 14.0694 14.6673 13.333V6.66634C14.6673 5.92996 14.0704 5.33301 13.334 5.33301Z"
        stroke="#6F6F6F"
        stroke-width="1.33"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.66732 10.6663C1.93398 10.6663 1.33398 10.0663 1.33398 9.33301V2.66634C1.33398 1.93301 1.93398 1.33301 2.66732 1.33301H9.33398C10.0673 1.33301 10.6673 1.93301 10.6673 2.66634"
        stroke="#6F6F6F"
        stroke-width="1.33"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_208_79881">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const TwitterIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <path
      d="M15.7726 1.58691H18.5838L12.4421 8.60649L19.6673 18.1586H14.01L9.57901 12.3653L4.50894 18.1586H1.69601L8.26518 10.6503L1.33398 1.58691H7.13491L11.1401 6.88219L15.7726 1.58691ZM14.7859 16.4759H16.3436L6.28848 3.18119H4.61687L14.7859 16.4759Z"
      fill={theme === "dark" ? "#fff" : "#0D0D0E"}
    />
  </svg>
);

return { LinkIcon, CopyIcon, TwitterIcon };
