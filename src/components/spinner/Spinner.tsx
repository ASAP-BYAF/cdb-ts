type SpinnerProps = {
  size?: number;
  strokeWidth?: number;
};

/**
 * スピナー
 */
const Spinner = (props: SpinnerProps) => {
  return (
    <div className="bg-slate-100 opacity-90 z-10 fixed w-[100%] h-[100%] flex flex-col justify-center">
      {/* Ref: https://coliss.com/articles/build-websites/operation/work/svg-spinners-by-n3r4zzurr0.html */}
      <svg
        width="300"
        height="300"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <g>
          <circle cx="12" cy="2.5" r="1.5" opacity=".14" />
          <circle cx="16.75" cy="3.77" r="1.5" opacity=".29" />
          <circle cx="20.23" cy="7.25" r="1.5" opacity=".43" />
          <circle cx="21.50" cy="12.00" r="1.5" opacity=".57" />
          <circle cx="20.23" cy="16.75" r="1.5" opacity=".71" />
          <circle cx="16.75" cy="20.23" r="1.5" opacity=".86" />
          <circle cx="12" cy="21.5" r="1.5" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="discrete"
            dur="0.75s"
            values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
};

export default Spinner;
