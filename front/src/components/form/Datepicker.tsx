import { CalendarDots } from "@phosphor-icons/react";
import { addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { InputHTMLAttributes } from "react";
import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.min.css";

interface DatepickProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  days: number;
  end?: boolean;
  disabled?: boolean;
}

export const Datepick = ({ name, days, end, disabled }: DatepickProps) => {
  const { control } = useFormContext();

  const startDate = new Date();
  const calculatedDate = addDays(new Date(startDate), days);

  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <DatePicker
            ref={ref}
            onKeyDown={(e) => e.preventDefault()}
            wrapperClassName="input-attribute"
            locale={ptBR}
            className={`${
              disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
            } h-8 w-32 pl-8 pr-2 rounded border border-zinc-300 hover:border-violet-600 focus:ring-2 focus:outline-violet-700 shadow-sm text-zinc-800`}
            excludeDateIntervals={[
              {
                start: calculatedDate,
                end: end ? new Date(9999, 11, 31) : calculatedDate,
              },
            ]}
            selected={value ? new Date(value) : calculatedDate}
            onChange={(date) => {
              onChange(date ? date.toISOString() : null); // Atualiza o valor do formulário com a data no formato ISO
            }}
            monthsShown={1}
            dateFormat="dd/MM/yyyy"
            renderCustomHeader={({
              monthDate,
              customHeaderCount,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div>
                <button
                  type="button"
                  aria-label="Previous Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--previous"
                  }
                  style={
                    customHeaderCount === 1
                      ? { visibility: "hidden" }
                      : undefined
                  }
                  onClick={decreaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                    }
                  >
                    {"<"}
                  </span>
                </button>
                <span className="react-datepicker__current-month">
                  {monthDate
                    .toLocaleString("pt-BR", { month: "long", year: "numeric" })
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </span>
                <button
                  type="button"
                  aria-label="Next Month"
                  className={
                    "react-datepicker__navigation react-datepicker__navigation--next"
                  }
                  style={
                    customHeaderCount === 1
                      ? { visibility: "hidden" }
                      : undefined
                  }
                  onClick={increaseMonth}
                >
                  <span
                    className={
                      "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                    }
                  >
                    {">"}
                  </span>
                </button>
              </div>
            )}
          />
        )}
      />
      <CalendarDots className="absolute top-1/4 left-2" weight="bold" />
    </div>
  );
};
