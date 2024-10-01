import { FunctionComponent, MutableRefObject } from 'react';
import { FileThumbnail } from './Thumbnail';
import convertSize from 'convert-size';
import { X } from 'lucide-react';

type FileToUploadCardProps = {
  file: File;
  fileId: number;
  filesToUpload: Array<File>;
  filesToUploadRef: MutableRefObject<HTMLInputElement>;
  setFilesToUpload: (filesToUpload: Array<File>) => void;
};

export const FileToUploadCard: FunctionComponent<FileToUploadCardProps> = ({
  file,
  fileId,
  filesToUpload,
  filesToUploadRef,
  setFilesToUpload,
}) => {
  return (
    <>
      <div className="flex items-center w-full gap-2 p-2 hover:backdrop-brightness-95  border border-dashed  rounded-lg">
        <div className="w-[5%] items-center">
          <FileThumbnail mimeType={file.type} />
        </div>

        <div className="flex items-center justify-between truncate w-[90%]">
          <div className="truncate">
            <h3 className="text-sm font-semibold text-gray-700 truncate ">{file?.name}</h3>
            <p className="text-sm font-medium truncate text-emerald-500 dark:text-zinc-500">
              {convertSize(file?.size)}
            </p>
          </div>
        </div>

        <div className="flex justify-items-center justify-center w-[5%]">
          <button
            onClick={() => {
              // const index = filesToUpload.findIndex((element) => element.name === file?.name);
              const updatedFiles = [...filesToUpload];
              filesToUploadRef.current.value = '';
              updatedFiles.splice(fileId, 1);

              setFilesToUpload(updatedFiles);
            }}
            type="button"
          >
            <X className="w-6 h-6 hover:bg-red-400 active:bg-red-500 active:text-gray-100 hover:text-white rounded-full  stroke-1" />
          </button>
        </div>
      </div>
    </>
  );
};
