// app/types/navigation.tsx
import { StormDocumentation } from './index';

// For your main tab navigator
export type RootTabParamList = {
    Weather: undefined;
    Storms: undefined;
    Settings: undefined;
};

// For your storm stack navigator (inside the Storms tab)
export type StormStackParamList = {
    StormList: undefined;
    CaptureStorm: undefined;
    StormDetail: { storm: StormDocumentation };
};


// export type RootStackParamList = {
//     Home: undefined;
//     Gallery: undefined;
// };

