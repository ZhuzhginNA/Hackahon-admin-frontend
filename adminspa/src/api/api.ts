import  axios  from "axios"

const URL = 'http://localhost:8000/api/reservation?status=в рассмотрении'

export const fetchReservations = async () => {
    try{
        const response = await axios.get(URL)
        return response.data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const fetchReservationsApproved = async () => {
    try{
        const response = await axios.get('http://localhost:8000/api/reservation?status=подтверждено')
        return response.data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const sendReservation = async (id: number, begin: string, end: string, status: string) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/reservation/${id}`, {
        begin,
        end,
        status
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export const fetchServers = async () => {
    try{
        const response = await axios.get('http://localhost:8000/api/server')
        return response.data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const fetchOs = async () => {
    try{
        const response = await axios.get('http://localhost:8000/api/os')
        return response.data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const postOs = async (id: number,data: number) => {
    try{
        const response = await axios.post(`http://localhost:8000/api/server/${id}`, {os_id: data})
        return response.data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const postClient = async (name: string, password: string, email: string) => {
    try{
        const response = await axios.post('http://localhost:8000/api/auth/register', {name: name, password: password, email: email})
        return response.data
    }catch(error){
        console.error(error)
        throw error
    }
}
