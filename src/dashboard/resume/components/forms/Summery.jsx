import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { generateSummary } from './../../../../../service/AIModel';

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || '');
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast("Please add job title first");
      return;
    }

    setLoading(true);

    const prompt = `
Job Title: ${resumeInfo.jobTitle}

Return ONLY a JSON array.

Each object must contain:
- experience_level (Fresher | Mid Level | Experienced)
- summary

Rules:
- 3–4 lines per summary
- Professional resume tone
- No markdown
- No explanation
- Valid JSON only
`;

    try {
      const text = await generateSummary(prompt);
      const parsed = JSON.parse(text);
      setAiGenerateSummeryList(parsed);
    } catch (error) {
      console.error("AI Error:", error);
      toast("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summery: summery,
      },
    };

    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
      enabledNext(true);
      toast("Details updated");
    } catch (error) {
      toast("Failed to save summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
        <h2 className="text-lg font-bold">Summary</h2>
        <p>Add a professional summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex items-end justify-between">
            <label>Add Summary</label>
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={GenerateSummeryFromAI}
              disabled={loading}
              className="flex gap-2 border-primary text-primary"
            >
              {loading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                <Brain className="w-4 h-4" />
              )}
              Generate from AI
            </Button>
          </div>

          <Textarea
            className="mt-5"
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
            placeholder="Write a short professional summary..."
          />

          <div className="flex justify-end mt-2">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList.length > 0 && (
        <div className="my-5">
          <h2 className="text-lg font-bold">Suggestions</h2>

          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item.summary)}
              className="p-5 my-4 rounded-lg shadow-lg cursor-pointer hover:border hover:border-primary"
            >
              <h2 className="my-1 font-bold text-primary">
                Level: {item.experience_level}
              </h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
