import { Brain, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useContext, useState } from 'react';
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { generateSummary } from './../../../../service/AIModel';

const PROMPT = `
Position Title: {positionTitle}

Generate 5–7 bullet points for resume experience.

Rules:
- Each bullet 1–2 lines
- Professional resume tone
- Use HTML only
- Use <ul><li> structure
- No explanation
- No markdown
`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || '');
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    const title = resumeInfo?.experience?.[index]?.title;

    if (!title) {
      toast('Please add position title first');
      return;
    }

    setLoading(true);

    const prompt = PROMPT.replace('{positionTitle}', title);

    try {
      const html = await generateSummary(prompt);
      setValue(html);
      onRichTextEditorChange({
        target: { value: html },
      });
    } catch (error) {
      console.error('AI Error:', error);
      toast('Failed to generate experience points');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-sm">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="w-4 h-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
