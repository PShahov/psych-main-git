import {instance} from './apiConfig/apiConfig';

export const apiMain = {
    getAllPsychs() {
        return instance.get<PsychType[]>('psych/all').then(res => res.data)
    },
    getFilteredPsych(data: FilteredRequestType) {
        let params = "";
        if(data.city != "other" && data.city.length != 0){
            params += `city=${data.city}&`
        }
        if(data.sex != "Any"){
            params += `sex=${data.sex}&`
        }
        params += `offline=${data.offlineCommunication}&`
        params += `online=${data.onlineCommunication}&`
        if(data.tagsIds.length != 0){
            params += `tagsIds=${data.tagsIds.join(',')}`;
        }

        params = "?" + params;

        if(params[params.length - 1] == '&'){
            params = params.slice(0,-1);
        }

        return instance.get<PsychType[]>('psych/filter' + params).then(res => res.data)
        // return instance.get<PsychType[]>('psych/filter', {
        //     params : {
        //         tagsIds: [1,2,3]
        //     }
        // },).then(res => res.data)
    },
    getTags() {
        return instance.get<TagType[]>('tag/all').then(res => res.data)
    },
}

export type PsychType = {
    id: number
    firstName: string
    lastName: string
    sex: SexType
    age: number
    experience: number
    price: number
    aboutMe: string
    education: string
    onlineCommunication: boolean
    offlineCommunication: boolean
    urlPhoto: string
    city: string
    uuid: string
    status: string
    rating: number
    competences: []
    tags: TagType[]
}
export type TagType = {
    id: number
    name: string
    category: string
}
export type SexType = 'Female' | 'Male' | 'Non-binary' | 'Polygender' | 'Genderfluid' | 'Bigender' | 'Agender' | 'Any'

type FilteredRequestType = {
    city: string
    offlineCommunication: boolean
    onlineCommunication: boolean
    sex: SexType | ''
    tagsIds: number[]
}