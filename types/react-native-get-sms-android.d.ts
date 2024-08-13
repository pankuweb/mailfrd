// declare module 'react-native-get-sms-android' {
//   interface SmsMessage {
//     body: string;
//     originatingAddress: string;
//     date: number;
//     read: boolean;
//     id: string;
//     threadId: string;
//   }

//   interface SmsAndroid {
//     autoSend(phoneNumber: any, message: any, arg2: (fail: any) => void, arg3: (success: any) => void): unknown;
//     getAll: (callback: (messages: SmsMessage[]) => void) => void;
//     addListener: (callback: (message: SmsMessage) => void) => void;
//     removeListener: () => void;
//     send: (
//       options: {
//         body: string;
//         address: string;
//       },
//       callback: (result: any) => void,
//     ) => void;
//   }

//   const SmsListener: SmsAndroid;
//   export default SmsListener;
// }
