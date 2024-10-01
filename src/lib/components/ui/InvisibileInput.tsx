import { useToast } from '@nsa/hooks/use-toast';
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import Compressor from 'compressorjs';

type InvisibleInputProps = InputHTMLAttributes<HTMLInputElement> & {
  files: Array<File>;
  setFiles: (files: Array<File>) => void;
};

export const InvisibleInput = forwardRef<HTMLInputElement, InvisibleInputProps>(
  ({ files, setFiles, ...props }, ref) => {
    const { toast } = useToast();

    // handle compression
    const handleImgCompression = (e: ChangeEvent<HTMLInputElement>) => {
      const image = e.target.files![0];
      new Compressor(image, {
        quality: 0.8,
        success: (compressedFile: File) => {
          toast({
            title: 'Compressing',
            variant: 'default',
            duration: 1500,
          });

          // if compressed file is less than 2 MB
          if (compressedFile.size < 2097152) {
            const newFiles = [...files];

            newFiles.push(compressedFile);
            setFiles(newFiles);
            toast({
              title: 'You have successfully attached a file',
              variant: 'success',
              duration: 1000,
            });
          }

          // if compressed file is greater than 2 MB
          else
            toast({
              title: 'File is bigger than 2MB',
              variant: 'destructive',
              duration: 2000,
            });
        },
      });
    };

    return (
      <input
        {...props}
        ref={ref}
        type="file"
        className="w-full hidden"
        multiple={false}
        // onChange={(e) => {
        //   if (e.target.files && e.target.files.length > 0 && e.target.files[0].size < 2097152) {
        //     const newFiles = [...files];
        //     newFiles.push(e.target.files[0]);
        //     setFiles(newFiles);
        //     toast({
        //       title: 'You have successfully attached a file',
        //       variant: 'success',
        //       duration: 1000,
        //     });
        //   } else
        //     toast({
        //       title: 'File is bigger than 2MB',
        //       variant: 'destructive',
        //       duration: 2000,
        //     });
        // }}
        onChange={(e) => handleImgCompression(e)}
      />
    );
  }
);

InvisibleInput.displayName = 'invisibleInputFileType';
