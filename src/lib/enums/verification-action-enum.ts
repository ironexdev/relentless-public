export enum VerificationActionEnum {
	DELETE_USER = 'DELETE_USER',
	LOGIN = 'LOGIN',
	REGISTRATION = 'REGISTRATION'
}

export const verificationActionEnumAsArray = Object.values(VerificationActionEnum) as [string];
