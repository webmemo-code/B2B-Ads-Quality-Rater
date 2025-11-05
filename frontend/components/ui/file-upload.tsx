import * as React from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileUploadProps {
  onFileSelect: (file: File, preview: string) => void;
  onClear?: () => void;
  accept?: string;
  preview?: string;
  className?: string;
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ onFileSelect, onClear, accept = "image/*", preview, className }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleFile(file);
      }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    };

    const handleFile = (file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    };

    const handlePaste = React.useCallback(
      (e: ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (items) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
              const file = items[i].getAsFile();
              if (file) {
                handleFile(file);
                e.preventDefault();
              }
            }
          }
        }
      },
      [onFileSelect]
    );

    React.useEffect(() => {
      document.addEventListener("paste", handlePaste);
      return () => document.removeEventListener("paste", handlePaste);
    }, [handlePaste]);

    return (
      <div ref={ref} className={cn("relative", className)}>
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Upload preview"
              className="w-full h-48 object-cover rounded-lg border-2 border-primary/20"
            />
            <button
              type="button"
              onClick={() => {
                if (inputRef.current) inputRef.current.value = "";
                onClear?.();
              }}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100"
              >
                Anderes Bild wählen
              </button>
            </div>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-gray-300 hover:border-primary hover:bg-gray-50",
              className
            )}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-primary/10 rounded-full">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Screenshot hochladen oder einfügen
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Drag & Drop, Klick zum Auswählen oder{" "}
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Cmd+V</kbd>
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <ImageIcon className="h-4 w-4" />
                <span>PNG, JPG, WEBP bis 10MB</span>
              </div>
            </div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";

export { FileUpload };
