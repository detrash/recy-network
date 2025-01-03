import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type cssmapType = {
  [id: string]: string;
};
const cssmap: cssmapType = {
  'option-hodler': 'option-hodler',
  'option-recycler': 'option-recycler',
  'option-waste': 'option-waste',
};
interface Props {
  beforeText?: string;
  id: string;
  name: string;
  activeState: (string: string) => void;
}
export const RadioBox = ({ beforeText, id, name, activeState }: Props) => {
  return (
    <div
      id={`${id}-box`}
      className={`relative flex items-center space-x-2 rounded-lg border-2 px-4 py-6 [&>#${cssmap[id]}]:hidden`}
    >
      <RadioGroupItem value={id} id={id} onClick={() => activeState(`${id}-box`)} />
      <div className="flex flex-col">
        {beforeText && <span>{beforeText}</span>}
        <Label className="mt-px text-base font-bold" htmlFor={id}>
          {name}
        </Label>
      </div>
      <span className="checked-box-symbol absolute right-6 top-6 hidden h-5 w-5 rounded-full bg-blue-500 text-center text-sm text-white">
        &#x2713;
      </span>
    </div>
  );
};
