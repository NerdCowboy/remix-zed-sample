// Adapted from https://github.com/mxkaske/mxkaske.dev/blob/main/components/craft/fancy-multi-select.tsx
import { X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";



interface MultiSelectComboboxProps  {
	list: string[];
  label: string;
}

export const MultiSelectCombobox = ({list, label}: MultiSelectComboboxProps)=>  {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  console.log({selected})
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((val: string) => {
    setSelected(prev => prev.filter(prevVal => prevVal !== val));
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected(prev => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          })
        }
      }
      // This is not a default behavior of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);


  const selectables = list.filter(item => !selected.includes(item));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <label>{label}
        <div
          className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        >
          <div className="flex gap-1 flex-wrap">
            {selected.map((item) => {
              return (
                <Badge key={item} variant="secondary">
                  {item}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              )
            })}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder="Select item…"
              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>
      </label>
      <div className="relative mt-2">
        {open && selectables.length > 0 ?
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((item) => {
                return (
                  <CommandItem
                    key={item}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(e) => {
                      setInputValue("")
                      setSelected(prev => [...prev, item])
                    }}
                    className="cursor-pointer"
                  >
                    {item}
                  </CommandItem>
                );
              })}
              {inputValue.length > 0 ? (
                <CommandItem
                  key="custom"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={(e) => {
                    setInputValue("")
                    setSelected(prev => [...prev, inputValue])
                  }}
                  className="cursor-pointer"
                >
                  Add {inputValue}
                </CommandItem>
              ): null}
            </CommandGroup>
          </div>
          : null}
      </div>
    </Command >
  )
}