import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type FullInputType = {
    callBack: (title: string) => void
}

export const FullInput: React.FC<FullInputType> = ({callBack}) => {

    const [titleValue, setTitleValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value);
        error && setError(false)
    }

    const addTaskHandler = () => {
        const trimmedTitle = titleValue.trim();
        if (!!trimmedTitle) {
            callBack(trimmedTitle);
            setTitleValue('');
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const inputClass = error ? 'error' : ''

    return (
        <div>
            <input
                type="text" value={titleValue}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressHandler}
                className={inputClass}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={'error-message'}>Title is required</div>}
        </div>
    );
};