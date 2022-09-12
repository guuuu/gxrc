interface IAPIRunes{
    "main": number
	"main_icon": string,
	"primary": IPerks[],
	"perks": IAPIRunesPerks[]
}

interface IAPIRunesPerks{
	"primary_id": number,
	"perks": IPerks[]
}

interface IPerks{
	"id": number,
	"icon": string
}

interface ISelectedChampion{
    cid: number,
    isDefault: boolean | null
	name: string
}

interface IRune{
	"name": string,
	"primaryStyleId": number,
	"subStyleId": number,
	"selectedPerkIds": number[],
	"current": boolean
}

interface IChampion{
	"name": string,
	"id": number,
	"image": string
}

interface IModalContent{
	"title": string,
	"content": JSX.Element
}

interface IRunesLayout{
	"primary": number,
	"sub_primary": number,
	"keystone": number,
	"r1": number,
	"r2": number,
	"r3": number,
	"r4": number,
	"r5": number,
	"r6": number,
	"r7": number,
	"r8": number,
}

interface IRuneInjection{
	"name": string,
	"primaryStyleId": number,
	"subStyleId": number,
	"selectedPerkIds": [number,number,number,number,number,number,number,number,number],
	"current": boolean
}

interface ISnack{
	"status": boolean,
	"severity": AlertColor,
	"content": string
}

interface IInjectionStatus{
	"injected": boolean,
	"reason"?: string
}

interface IChampionRunes{
	"champion": IChampion,
	"default": boolean,
	"name": string,
	"runes": IRuneInjection,
	"uuid": string
}

interface IKeyCard{
	"name": string,
	"id": number,
	"runes": IRuneInjection
}