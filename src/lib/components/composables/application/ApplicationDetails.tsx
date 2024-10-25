'use client';
import { useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { LabelValue } from '../../ui/LabelValue';
import QRCode from 'react-qr-code';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { TimelineItem } from '../timeline/TimelineItem';

type TimelineItemProps = {
  active?: boolean;
  title: string;
  description?: string;
  status?: string;
  date: string | null;
};

const TimelineItems: Array<TimelineItemProps> = [
  { date: dayjs().toString(), title: 'Submit Application', active: false },
  { date: dayjs().toString(), title: 'For Survey Fee Payment', active: true },
];

export const ApplicationDetails = () => {
  const applicationId = useParams().applicationId;
  const lotNo = useApplicationFormStore((state) => state.lotNo);
  const street = useApplicationFormStore((state) => state.street);
  const subdivision = useApplicationFormStore((state) => state.subdivision);
  const barangay = useApplicationFormStore((state) => state.barangay);
  const firstName = useApplicationFormStore((state) => state.firstName);
  const middleName = useApplicationFormStore((state) => state.middleName);
  const lastName = useApplicationFormStore((state) => state.lastName);
  const nameExt = useApplicationFormStore((state) => state.nameExt);

  // append address
  const address = `${lotNo} ${street}, ${subdivision}, ${barangay}`;

  // append name or full name
  const fullName = `${lastName}, ${firstName} ${middleName ? `${middleName[0]}.` : ','} ${nameExt}`;

  if (!applicationId)
    return <div className="w-[100vw] h-[100vh] justify-center text-center">Invalid application ID</div>;

  return (
    <>
      <div className="flex flex-col justify-center items-center text-center py-10 gap-4">
        <p className="text-3xl px-10">New Service Application</p>

        <div className="grid sm:grid-rows-1 lg:grid-cols-2 gap-4 sm:w-full lg:w-fit px-5 sm:px-5 lg:px-0">
          <section className="border rounded text-start py-4 w-full px-5">
            <div className="text-gray-500">Application Date</div>
            <div>{dayjs().format('MMM DD, YYYY')}</div>
          </section>

          <section className="border rounded text-start py-4 w-full  px-5">
            <div className="text-gray-500 flex gap-2">
              <span>Application ID</span>
            </div>
            <div>{applicationId.toString()}</div>
          </section>
        </div>

        {/* QR AND DETAILS */}
        <div className="flex sm:flex-row lg:flex-row gap-4 flex-col  sm:px-2 items-center justify-items-center">
          <div className="bg-white sm:w-full lg:w-1/2 flex justify-center ">
            <div className="w-[50%] h-[50%]">
              <QRCode
                size={180}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={applicationId.toString()}
                viewBox={`0 0 180 180`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-start  sm:w-full lg:w-1/2 sm:px-5 lg:px-0 px-5">
            <LabelValue label="Status" value="FOR SURVEY FEE PAYMENT" id="status" />
            <LabelValue label="Address" value={address} id="address" />
            <LabelValue label="Applicant" value={fullName} id="fullName" />
          </div>
        </div>

        {/* TIMELINE ITEM */}
        <div className="h-full w-fit rounded bg-white">
          {TimelineItems &&
            TimelineItems.toReversed().map((item: TimelineItemProps, idx: number) => {
              // use this instead of idnex since the array is reversed
              const cdIdx = TimelineItems.length - (idx + 1);
              return (
                <TimelineItem
                  key={idx}
                  currentIndex={cdIdx}
                  lastIndex={TimelineItems.length}
                  timeStamp={dayjs(item.date).format('MMM DD, YYYY hh:mm A')}
                  title={item.title}
                  subtitle={item.status}
                  content={item.description}
                  active
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
