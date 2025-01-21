import { Button, Chip, Input, Tooltip } from "@material-tailwind/react";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

interface SearchInputProps {
    currentSearchTerms: string[];
    onUpdateSearchTerms: (newSearchTerms: string[]) => void;
}

export const SearchInput = (props: SearchInputProps) => {
    const [newSearchValue, setNewSearchValue] = useState("");
    const [disabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setIsDisabled(props.currentSearchTerms.includes(newSearchValue) || !newSearchValue.trim())
    }, [newSearchValue]);

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setNewSearchValue(searchTerm);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !disabled) {
            handleAddSearchTermClick();
        }
    }

    const handleAddSearchTermClick = () => {
        const updatedSearchTerms = props.currentSearchTerms.slice();
        updatedSearchTerms.push(newSearchValue);
        props.onUpdateSearchTerms(updatedSearchTerms);
        setNewSearchValue("");
    }

    const handleRemoveSearchTerm = (searchTermToRemove: string) => {
        let updatedSearchTerms = props.currentSearchTerms.slice();
        updatedSearchTerms = updatedSearchTerms.filter((searchTerm) => { return searchTerm != searchTermToRemove });
        props.onUpdateSearchTerms(updatedSearchTerms);
    }

    return (
        <div className="mb-5">
            <div className="flex mb-1">
                <div className="w-3/4 !mr-5">
                    <Input
                        onKeyDown={handleKeyDown}
                        value={newSearchValue}
                        size="md"
                        color="gray"
                        label="Add search term"
                        className="!text-primary-green"
                        onChange={onSearchInputChange}
                        crossOrigin={undefined}
                    />
                </div>
                <Tooltip content="Add search term" placement="right">
                    <Button
                        className="justify-center w-1/12 bg-primary-green text-white hover:bg-primary-green-darker"
                        type="button"
                        onClick={handleAddSearchTermClick}
                        disabled={disabled}
                    >
                        +
                    </Button>
                </Tooltip>
            </div>
            <div className="flex gap-2">
                {props.currentSearchTerms.map((searchTerm) => {
                    return (
                        <Chip
                            key={searchTerm}
                            className="bg-secondary-yellow text-black"
                            open={true}
                            value={searchTerm}
                            onClose={() => { handleRemoveSearchTerm(searchTerm) }}
                        />
                    );
                })}
            </div>
        </div>
    );
}