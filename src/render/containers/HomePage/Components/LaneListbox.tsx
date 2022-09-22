import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface Props{
	"f": (s: string) => void,
	//"f": Function,
}

const lanes = [
	{ name: 'top' },
	{ name: 'jungle' },
	{ name: 'middle' },
	{ name: 'adc' },
	{ name: 'support' }
]

const LaneListbox = (props: Props) =>  {
	const [selected, setSelected] = useState(lanes[0])

	return (
		<div className="w-full">
			<Listbox value={selected} onChange={setSelected}>
				<div className="relative">
					<Listbox.Button className="relative w-full cursor-pointer bg-sidebar_bt_bg py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
						<span className="block truncate text-white">{selected.name}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
						</span>
					</Listbox.Button>
					<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" >
						<Listbox.Options className="absolute mt-1 max-h-36 w-full overflow-auto rounded-md bg-sidebar_bt_bg py-1 text-base focus:outline-none sm:text-sm">
							{lanes.map((lane, index) => (
								<Listbox.Option
									key={index}
									className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-bt1 text-white' : 'text-white' }` }
									value={lane}
									onClick={() => { props.f(lane.name) }}
								>
									{({ selected }) => (
										<>
											<span className={`block truncate ${selected ? 'font-medium' : 'font-normal' }`} > {lane.name} </span>
											{selected ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
													<CheckIcon className="h-5 w-5" aria-hidden="true" />
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	)
}

export default LaneListbox;
