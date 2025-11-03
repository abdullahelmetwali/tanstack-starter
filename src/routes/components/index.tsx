import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { MultiPicker } from '@/components/core/multi-picker';
import { Picker } from '@/components/core/picker'
import { CalendarDate } from '@/components/core/calendar-date';
import { FormattedDate } from '@/components/core/formatted-date';

export const Route = createFileRoute('/components/')({
  component: Components,
})

function Components() {
  const {
    watch,
    setValue,
  } = useForm();

  const singleNoSearch = watch("item-1");
  const singleSearch = watch("item-2");

  const multiNoSearchDropdown = watch("item-3");
  const multiSearchDropdown = watch("item-4");

  const multiSearchContainer = watch("item-5");
  const multiNoSearchContainer = watch("item-6");

  const date = watch("date");

  const today = new Date().toISOString().split('T')[0];
  const items = [
    {
      id: 1,
      name: "ID NO 1"
    },
    {
      id: 2,
      name: "ID NO 2"
    },
    {
      id: 3,
      name: "ID NO 3"
    },
    {
      id: 4,
      name: "ID NO 4"
    },
  ];

  return (
    <main className='min-h-dvh grid place-items-center text-base'>
      <h1>
        Components
      </h1>
      <div className='grid md:grid-cols-2 gap-4 mb-8'>
        <div>
          <Picker
            items={items}
            label='Single Picker (No Search)'
            placeHolder={'Select any of these items'}

            value={singleNoSearch}
            setValue={setValue}
            setValueFor={"item-1"}
          />
        </div>
        <div>
          <Picker
            items={items}
            label='Single Picker (Search)'
            placeHolder={'Select any of these items'}

            value={singleSearch}
            setValue={setValue}
            setValueFor={"item-2"}

            searchMode
          />
        </div>

        <div className='w-80'>
          <MultiPicker
            items={items}

            variant={"dropdown"}
            label='Multi Picker (Dropdown No Search)'
            placeHolder={'Choose more than one'}

            value={multiNoSearchDropdown}
            setValue={setValue}
            setValueFor={"item-3"}
          />
        </div>

        <div className='w-80'>
          <MultiPicker
            items={items}

            variant={"dropdown"}
            label='Multi Picker (Dropdown Search)'
            placeHolder={'Choose more than one'}

            value={multiSearchDropdown}
            setValue={setValue}
            setValueFor={"item-4"}

            searchMode
          />
        </div>

        <div className='w-80'>
          <MultiPicker
            items={items}

            variant={"container"}
            label='Multi Picker (Container No Search)'
            placeHolder={'Choose more than one'}

            value={multiNoSearchContainer}
            setValue={setValue}
            setValueFor={"item-5"}
          />
        </div>

        <div className='w-80'>
          <MultiPicker
            items={items}

            variant={"container"}
            label='Multi Picker (Container Search)'
            placeHolder={'Choose more than one'}

            value={multiSearchContainer}
            setValue={setValue}
            setValueFor={"item-6"}

            searchMode
          />
        </div>
        <div>
          <CalendarDate
            date={date}
            setValue={setValue}
            errors={[]}
          />
        </div>
        <div>
          <p className='text-sm'>
            Formatted Date (by click)
          </p>
          <FormattedDate date={today} />
        </div>
      </div>
    </main>
  )
}
