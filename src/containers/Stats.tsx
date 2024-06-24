import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

export default observer(function Stats() {

  const { typingStore } = useStore();
  const { ElapsedTime, paragraph, typedText, errorCount, wrongLetters } = typingStore;

  const calculateWPM = () => {
    const totalChars = paragraph.replace(/\s/g, "").length;
    const totalWords = totalChars / 5;
    return Math.round(totalWords / ((ElapsedTime() / 1000)/60))
  }

  return (
    <>
      <div className="stats flex relative items-center justify-center w-5/6 h-5/6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="max-w-[300px]">
            <CardHeader>
            </CardHeader>
            <CardBody>
            </CardBody>
            <CardFooter>

            </CardFooter>
          </Card>
          <Card>

          </Card>
        </div>
      </div>
    </>
  )
})