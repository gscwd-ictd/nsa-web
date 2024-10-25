import { FunctionComponent } from 'react';
import { HiArrowCircleLeft } from 'react-icons/hi';

export type TimelineItemProps = {
  active?: boolean;
  title: string;
  subtitle?: string;
  content?: string;
  timeStamp: string | null;
  lastIndex: number;
  currentIndex: number;
};

export const TimelineItem: FunctionComponent<TimelineItemProps> = ({
  active = false,
  title = '',
  content = '',
  subtitle = '',
  timeStamp = null,
  lastIndex,
  currentIndex,
}) => {
  // function that returns a jsx/element
  const getStateByTitle = (title: string) => {
    if (title.toLowerCase().includes('training completed')) {
      return (
        <div className="flex gap-1 items-center">
          <span className="">{title}</span>
          <span className="px-2 bg-green-500 text-white text-base py-0.5 rounded-xl">End</span>
          {currentIndex + 1 === lastIndex ? (
            <span>
              <HiArrowCircleLeft color="green" size={18} className="animate-bounce-horizontal" />
            </span>
          ) : null}
          {/* <HiCheckCircle color="green" size={18} className="animate-bounce" /> */}
        </div>
      );
    } else if (title.toLowerCase().includes('training drafted')) {
      return (
        <div className="flex gap-1 items-center">
          <span>{title}</span>
          <span className="px-2 bg-indigo-500 text-white text-base py-0.5 rounded-xl items-center">Start</span>
          {currentIndex + 1 === lastIndex ? (
            <span>
              <HiArrowCircleLeft color="green" size={18} className="animate-bounce-horizontal" />
            </span>
          ) : null}
        </div>
      );
    } else
      return (
        <div className="flex gap-2 items-center">
          <span>{title}</span>
          {currentIndex + 1 === lastIndex ? (
            <span>
              <HiArrowCircleLeft color="green" size={18} className="animate-bounce-horizontal" />
            </span>
          ) : null}
        </div>
      );
  };

  return (
    <div className="relative pl-2 sm:pl-48 py-4 group">
      {/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after)  */}
      <div
        className={`flex flex-col items-start sm:flex-row  group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full sm:before:ml-[8rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left- sm:after:left-0 after:w-2 after:h-2 ${
          currentIndex + 1 === lastIndex
            ? 'before:bg-gray-200 after:bg-blue-500 after:border-blue-200 before:px-px '
            : 'before:bg-gray-300 after:bg-gray-400 after:border-gray-200'
        } after:border-4 after:box-content after:rounded-full sm:after:ml-[8rem] after:-translate-x-1/2 `}
      >
        <div className="flex flex-col pl-4 h-[6rem]">
          {/* PURPLE LABEL */}
          <div
            className={`font-medium text-lg -mt-1.5 ${
              currentIndex + 1 === lastIndex ? 'text-primary' : 'text-black'
            } flex gap-1 items-center`}
          >
            {getStateByTitle(title)}
          </div>
          {timeStamp === null ? (
            <time className="sm:absolute left-0 items-center justify-center text-base font-medium uppercase w-32 h-full text-gray-600 tracking-wide">
              N/A
            </time>
          ) : (
            <time className="sm:absolute left-0 items-center justify-center text-base font-sans  w-32 h-full text-gray-500">
              {timeStamp}
            </time>
          )}
          <div className="text-base font-medium text-indigo-600 text-justify mt-1 ">{subtitle}</div>
          {/* CONTENT */}
          <div className="text-gray-600 text-base  font-medium tracking-wide">{content}</div>
        </div>
      </div>
    </div>
  );
};
