import React, {ChangeEvent} from 'react';

type CheckboxType = {
    isDone: boolean
    callBack: (checked: boolean) => void
}

export const Checkbox: React.FC<CheckboxType> = ({isDone, callBack}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }

    return (
        <input
            type="checkbox"
            checked={isDone}
            onChange={onChangeHandler}
        />
    );
};