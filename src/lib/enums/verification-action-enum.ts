export enum VerificationActionEnum {
	DELETE_USER = 'DELETE_USER',
	LOGIN = 'LOGIN',
	REGISTRATION = 'REGISTRATION',
	CHANGE_EMAIL = 'CHANGE_EMAIL',
	UPDATE_PROFILE = 'UPDATE_PROFILE'
}

export const verificationActionEnumAsArray = Object.values(VerificationActionEnum) as [string];
