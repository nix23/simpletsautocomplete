import React, { 
  ChangeEvent, 
  MouseEvent, 
  FC, 
  useState, 
  useRef, 
  useEffect, 
  useMemo 
} from 'react';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';

import './Autocomplete.scss';
import './Suggestions.scss';

import useDebounce from '../Util/useDebounce';
import Util from '../Util/Util';
import AutocompleteIcon from './Icon';
import AutocompleteLoader from './Loader';
import TextSelection from './TextSelection';

interface ISuggestion {
  id: string;
  value: string;
}
interface IAutocompleteProps {
  filterData?: (value: string, data: Array<ISuggestion>) => Array<ISuggestion>;
  getUrl?: Function | undefined;
  placeholder?: string;
}

const Autocomplete: FC<IAutocompleteProps> = ({ 
  filterData, 
  getUrl, 
  placeholder
}) => {
  if (typeof placeholder == 'undefined')
    placeholder = 'Search...';
  if (typeof filterData == 'undefined')
    filterData = (value: string, data: Array<ISuggestion>) => data;

  const inputEl = useRef<HTMLInputElement>(null);
  const suggestionsEl = useRef<HTMLElement>(null);
  // On suggestion select value will be changed and useEffect hook will be
  // triggered again, so we need cancel fetch in that case.(useRef is used
  // because we do not want to rerender component in such case)
  const cancelFetch = useRef(false);

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // We will execute effect with 300ms delay after last keystroke to
  // optimize API calls count to backend
  const debouncedValue = useDebounce(value, 300);

  // Close dropdown on click anywhere outside suggestions element
  useEffect(() => {
    const onClick = (e: any) => {
      if(suggestionsEl.current && !suggestionsEl.current.contains(e.target))
        setShow(false);
    };
    document.body.addEventListener('click', onClick, true);
    return () => {
      document.body.removeEventListener('click', onClick);
    };
  }, []);
  useEffect(() => {
    if(cancelFetch.current) {
      cancelFetch.current = false;
      return;
    }

    let didCancel = false;
    if (value.length == 0) {
      setShow(false);
      setIsLoading(false);
      return;
    }

    // execFetch fn is used for 2 diff.types of data load:
    // 1) With preloaded data(like from .json file) 2) With fetch from remote url
    const execFetch = async (fetchFn: Function, getDataFn: Function) => {
      setIsLoading(true);

      try {
        let result = await fetchFn();
        result = await getDataFn(result);
        result = filterData?.(value, result);
        //console.log(result);

        if (!didCancel) {
          setSuggestions(result);
          setShow(true);
          setIsLoading(false);
          if(
            result.length == 0 || 
            (
              result.length == 1 && 
              result[0].value.toLowerCase() == value.toLowerCase()
            )
          )
            setShow(false);
        }
      } catch (error) {
        if (!didCancel) {
          console.log(error);
          setIsLoading(false);
        }
      }
    };
    // Emulating fetch with preloaded data with random(50-350ms) delay
    const emulateFetchData = async () => {
      return execFetch(
        () => new Promise((resolve) => setTimeout(
          () => resolve([]),
          //Util.random(200, 1500)
          Util.random(50, 350)
        )),
        (data: []) => new Promise((resolve) => resolve(data))
      );
    };
    // Loading data from remote url
    const fetchData = async (url: string) => {
      return execFetch(
        () => fetch(url),
        (res: any) => res.json()
      );
    };

    // getUrl prop should be passed to launch fetch from remote
    if(typeof getUrl == 'function')
      fetchData(getUrl(value));
    else
      emulateFetchData();

    return () => {
      didCancel = true;
    };
  }, [debouncedValue]);

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    //setSuggestions([]);
    setValue(value);
  };
  const selectSuggestion = (value: ISuggestion) => {
    cancelFetch.current = true;
    setValue(value.value);
    setSuggestions([]);
    setShow(false);
  };
  const focusInput = () => inputEl.current && inputEl.current.focus();

  return (
    <section className='autocomplete'>
      <section className='autocomplete__inputWrap'>
        <input
          data-testid='autocomplete'
          className='autocomplete__input'
          autoComplete='off'
          value={value}
          onChange={onTextChange}
          placeholder={placeholder}
          type={'text'}
          ref={inputEl}
        />
        <AutocompleteIcon onClick={focusInput}>
          <FaSearch/>
        </AutocompleteIcon>
        <AutocompleteIcon rightIcon onClick={focusInput}>
          {isLoading && <AutocompleteLoader/>}
        </AutocompleteIcon>
      </section>
      {suggestions.length > 0 && show && (
        <section 
          className='autocomplete__suggestions' 
          ref={suggestionsEl}
          data-testid='suggestions'
        >
          {suggestions.map((item: ISuggestion) => (
            <div 
              key={item.id} 
              className='autocomplete__suggestionsItem'
              onClick={() => selectSuggestion(item)}
              data-testid='suggestionitem'
            >
              <TextSelection
                text={item.value}
                selectionText={value}
              />
            </div>
          ))}
        </section>
      )}
    </section>
  );
};

export default Autocomplete;