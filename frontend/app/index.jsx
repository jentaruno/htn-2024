import {View} from 'react-native';
import {Link} from 'expo-router';

export default function Page() {
    return (
        <View>
            <Link href="/camera">Camera</Link>
            <Link href="/food-info">Food Info</Link>
        </View>
    );
}