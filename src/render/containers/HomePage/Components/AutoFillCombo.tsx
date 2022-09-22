import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface Props{
    "champions": IChampion[]
}

const AutoFillCombo = (props: Props): JSX.Element => {
    const [query, setQuery] = useState('')
    const champions = props.champions;
    const [selected, setSelected] = useState(champions[0])

    const filteredChampions: IChampion[] =
        query === ''
            ? champions
            : champions.filter((champion: IChampion) =>
                champion.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )
    // const filteredPeople =
    //     query === ''
    //         ? people
    //         : people.filter((person) =>
    //             person.name
    //                 .toLowerCase()
    //                 .replace(/\s+/g, '')
    //                 .includes(query.toLowerCase().replace(/\s+/g, ''))
    //         )
    // return(<></>)
    return (
        <div className="w-full">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative">
                    <div className="relative w-full cursor-default overflow-hiddentext-left focus:outline-none sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-white focus:ring-0 focus:outline-none bg-sidebar_bt_bg"
                            displayValue={(champion: IChampion) => champion.name}
                            onChange={(event) => setQuery(event.target.value)}
                            data-customchampid={selected.id}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-36 w-full overflow-auto rounded-md bg-sidebar_bt_bg py-1 text-base focus:outline-none sm:text-sm">
                            {filteredChampions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-white">
                                    Champion not found.
                                </div>
                            ) : (
                                filteredChampions.map((champion) => (
                                    <Combobox.Option
                                        key={champion.id}
                                        className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-bt1 text-white' : 'text-white' }` }
                                        value={champion}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal' }`} >
                                                    {champion.name}
                                                </span>
                                                {selected ? (
                                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : '' }`} >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )

}

export default AutoFillCombo;