import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.2.159:3333',
})
