import { CsvUpload } from "./components/csv-upload";
import { SimpleChart } from "./components/simple-chart";
import { Button } from "./components/ui/button";

export default function App() {
  const handleFileSelect = (file: File) => {
    console.log("Selected file:", file);
    // Add CSV processing logic here
  };

  const handleSummarize = () => {
    console.log("Summarize button clicked!");
    // Add summarize logic here
  };

  return (
    <div
      className="size-full min-h-screen p-4"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1504812333783-63b845853c20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHN0YXJzJTIwZ2FsYXh5JTIwbmVidWxhfGVufDF8fHx8MTc1ODkwNTE2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col space-y-8">
        {/* CSV Upload at the top center */}
        <div className="flex justify-center">
          <CsvUpload onFileSelect={handleFileSelect} />
        </div>

        {/* Chart + Planet image */}
<div className="flex ml-18">
  {/* Left side: Chart takes space */}
  <div className="flex-1">
    <SimpleChart />
  </div>

  {/* Right side: Planet Image */}
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
    alt="Planet"
    className="w-80 h-80 object-cover rounded-full shadow-lg mr-14"
  />
</div>

{/* Summarize Button BELOW chart row */}
<div className="mt-4">
  <Button
    onClick={handleSummarize}
    className="w-fit bg-indigo-600 text-white hover:bg-indigo-700 ml-100"
  >
    Summarize
  </Button>
</div>

      </div>
    </div>
  );
}