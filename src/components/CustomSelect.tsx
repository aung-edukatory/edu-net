"use client";

import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type CustomSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function CustomSelect({
  name,
  label,
  placeholder,
  options,
  required = false,
  disabled = false,
  className = "",
}: CustomSelectProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef({ text: "", time: 0 });
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const selected = options.find((option) => option.value === value);
  const expanded = isOpen && !disabled;

  useEffect(() => {
    if (!expanded) return;
    const dismiss = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [expanded]);

  useEffect(() => {
    if (expanded)
      document.getElementById(`${id}-option-${activeIndex}`)?.scrollIntoView({
        block: "nearest",
      });
  }, [activeIndex, expanded, id]);

  useEffect(() => {
    const form = triggerRef.current?.form;
    const reset = () => {
      setValue("");
      setIsOpen(false);
      setInvalid(false);
    };
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, []);

  const open = (index = 0) => {
    const selectedIndex = options.findIndex((option) => option.value === value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : index);
    searchRef.current = { text: "", time: 0 };
    setIsOpen(true);
  };

  const select = (index: number) => {
    if (!options[index]) return;
    setValue(options[index].value);
    setInvalid(false);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape" && expanded) {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(false);
    } else if (event.key === "Tab") {
      setIsOpen(false);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      if (!expanded) open(step === 1 ? 0 : options.length - 1);
      else setActiveIndex((index) => Math.max(0, Math.min(options.length - 1, index + step)));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex(event.key === "Home" ? 0 : options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (expanded) select(activeIndex);
      else open();
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const text = (now - searchRef.current.time < 700 ? searchRef.current.text : "") + event.key.toLowerCase();
      searchRef.current = { text, time: now };
      const index = options.findIndex((option) => option.label.toLowerCase().startsWith(text));
      if (index >= 0) {
        setIsOpen(true);
        setActiveIndex(index);
      }
    }
  };

  return (
    <div
      ref={rootRef}
      className={`relative grid gap-2 text-sm text-[var(--navy)] ${className}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <label id={`${id}-label`} htmlFor={id} className="font-bold">
        {label}
      </label>
      {/* A validation proxy preserves required checks and FormData without a native select. */}
      <input
        className="pointer-events-none absolute bottom-0 left-0 h-px w-px opacity-0"
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={() => {}}
        onInvalid={(event) => {
          event.preventDefault();
          setInvalid(true);
          const firstInvalid = event.currentTarget.form?.querySelector(":invalid");
          if (firstInvalid === event.currentTarget) triggerRef.current?.focus();
        }}
      />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-labelledby={`${id}-label`}
        aria-haspopup="listbox"
        aria-expanded={expanded}
        aria-controls={expanded ? `${id}-listbox` : undefined}
        aria-activedescendant={expanded && options[activeIndex] ? `${id}-option-${activeIndex}` : undefined}
        aria-required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        disabled={disabled}
        onClick={() => expanded ? setIsOpen(false) : open()}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-md border bg-white px-4 py-3 text-left text-sm font-medium outline-none transition-colors hover:border-[var(--navy)]/40 focus-visible:border-[var(--navy)] focus-visible:ring-2 focus-visible:ring-[var(--navy)]/10 disabled:cursor-not-allowed disabled:opacity-50 ${invalid ? "border-red-400" : expanded ? "border-[var(--navy)]" : "border-[var(--border)]"}`}
      >
        <span className={selected ? "" : "text-[var(--muted)]"}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-[var(--muted)] transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-56 overflow-y-auto overscroll-contain rounded-lg border border-[var(--border)] bg-white p-1.5 shadow-[0_8px_24px_rgba(2,31,61,0.10)]"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              onPointerMove={() => setActiveIndex(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => select(index)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${activeIndex === index ? "bg-[var(--surface)]" : ""} ${option.value === value ? "font-semibold" : "font-medium"}`}
            >
              {option.label}
              {option.value === value && <Check aria-hidden="true" className="h-4 w-4 shrink-0" />}
            </li>
          ))}
        </ul>
      )}
      {invalid && <p id={`${id}-error`} className="text-xs font-medium text-red-600">Please select an option.</p>}
    </div>
  );
}
