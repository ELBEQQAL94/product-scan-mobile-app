import { OpenFoodData } from "@/constants/responses";
import { View, Text, Image, StyleSheet } from "react-native"

interface OpenFoodProps {
    openFood: OpenFoodData;
    score: string;
}

const Profile: React.FC<OpenFoodProps> = ({ score, openFood }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header_container}>
                <Image 
                    source={{uri: "https://images.openfoodfacts.org/images/products/611/103/100/5064/front_fr.9.400.jpg"}}
                    resizeMode="contain"
                    width={150}
                    height={150}
                />
                <View style={styles.product_title_score_container}>
                    <Text style={styles.product_title}>{openFood.product.product_name}</Text>
                    <Text style={styles.product_score}>{score}/100</Text>
                </View>
            </View>
            <View style={styles.spacer} />
            <View>
                <Text>Ingradiant</Text>
                <View>
                    {/* list of ingradients */}
                    {JSON.stringify(openFood.product.ingredients)}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        paddingTop: 30, 
        paddingBottom: 30
    },
    header_container: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    product_title: { 
        fontWeight: 'bold', 
        fontSize: 20
    },
    product_score: { 
        fontSize: 20 
    },
    product_title_score_container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    spacer: { 
        height: 1, 
        backgroundColor: "black"
    }
})

export default Profile;