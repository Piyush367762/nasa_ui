import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, FileText, CheckCircle } from "lucide-react";

interface CsvUploadProps {
  onFileSelect?: (file: File) => void;
}

export function CsvUpload({ onFileSelect }: CsvUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-white">Upload CSV File</CardTitle>
        <CardDescription className="text-white/80">
          Drag and drop your CSV file here, or click to browse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            dragActive
              ? "border-blue-400 bg-blue-400/10"
              : "border-white/30 hover:border-white/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {selectedFile ? (
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-8 w-8 lg:h-10 lg:w-10 text-green-400" />
                <span className="text-white">File selected successfully!</span>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-white/80" />
                <span className="text-white text-sm lg:text-base">{selectedFile.name}</span>
                <span className="text-white/60 text-sm">({formatFileSize(selectedFile.size)})</span>
              </div>
              <Button
                onClick={onButtonClick}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Choose Different File
              </Button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
              <div className="flex items-center gap-3">
                <Upload className="h-8 w-8 lg:h-10 lg:w-10 text-white/60" />
                <div className="text-center lg:text-left">
                  <p className="text-white">
                    {dragActive ? "Drop your CSV file here" : "Drop your CSV file here"}
                  </p>
                  <p className="text-white/60 text-sm">Drag and drop or click to browse</p>
                </div>
              </div>
              <Button
                onClick={onButtonClick}
                className="bg-blue-600 hover:bg-blue-700 text-white border-0"
              >
                Browse Files
              </Button>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="mt-6 space-y-3">
            <h4 className="text-white">File Details</h4>
            <div className="bg-white/10 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">Name:</span>
                <span className="text-white">{selectedFile.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Size:</span>
                <span className="text-white">{formatFileSize(selectedFile.size)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Type:</span>
                <span className="text-white">{selectedFile.type || "text/csv"}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}