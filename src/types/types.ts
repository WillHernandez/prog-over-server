import express from 'express'

export type EReq = express.Request;
export type ERes = express.Response;

export type Excercise = {
	name: string
	muscle: string
	category?: string
	link?: string
}

export type NewUser = {
	username: string;
	email: string;
	password: string;
}