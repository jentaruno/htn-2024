import {StyleSheet, View} from 'react-native';
import {Link} from 'expo-router';

export default function Page() {
    return (
        <View style={styles.main}>
            <Link href="/camera">Camera</Link>
            <Link href="/food-info">Food Info</Link>
        </View>
    );
}


const styles = StyleSheet.create(({
    main: {
        paddingHorizontal: 20,
        paddingVertical: 100
    }
}));