import React from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity, Dimensions,} from 'react-native';
import {Button, Searchbar} from "react-native-paper";
import CommentBox from './Comment';
//import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

/*var images = 
[
    require('./assets/Lane.png'),
    require('./assets/Lane.png'),fff
    require('./assets/Lane.png'),
    require('./assets/Lane.png'),
    reuqire('./assets/Lane.png'),

]
var {width, height} = Dimensions.get('window')
*/
const Profile = ({user}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={user.avatar ? {uri: user.avatar} : require('./assets/logo.png')}
                    style={styles.avatar}
                />
                <Text style={styles.headerTitle}>{user.email}</Text>
                <View style= {{flexDirection: 'row',alignItems: "center", flex: 3, justifyContent: 'space-around'}}>
                    <View style= {{alignItems: 'center'}}>
                        <Text style={styles.posts}>Posts</Text>
                    </View>
                    <View style= {{alignItems: 'center'}}>
                        <Text style={styles.followers}>Followers</Text>
                    </View>
                    <View style= {{alignItems: 'center'}}>
                        <Text style={styles.following}>Following</Text>
                    </View>
                </View>
                <View style= {{flexDirection: 'row'}}>
                    <Button
                    style={{flex:3, marginLeft: 10, justifyContent: 'center', height: 5}}>
                        <Text>Edit Profile</Text>
                    </Button>
                </View>
            </View>
            <View style={styles.userInfo}>

                <View style={{ alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity style={{alignItems: 'center'}}>
                        <Image source ={require('./assets/app-outline.png')}
                        style={styles.appOutline}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source ={require('./assets/app-outline.png')}
                        style={styles.appOutline}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source ={require('./assets/app-outline.png')}
                        style={styles.appOutline}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source ={require('./assets/app-outline.png')}
                        style={styles.appOutline}
                            />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.userInfo}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                  
                        <TouchableOpacity style={{alignItems: 'center'}}>
                            <Image source ={require('./assets/Lane.png')}
                              style={styles.photo}
                            />
                        </TouchableOpacity>
                         <TouchableOpacity>
                            <Image source ={require('./assets/Emily.png')}
                            style={styles.photo}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source ={require('./assets/Marshall.png')}
                           style={styles.photo}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                           <Image source ={require('./assets/Parker.png')}
                           style={styles.photo}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                           <Image source ={require('./assets/Chris.png')}
                           style={styles.photo}
                            />
                        </TouchableOpacity>
                
                    </View>
                </View>
            </View>
        </View>
    );
};
 /*   renderSectionOne = () => {
        return images.map((image, index) => {
            return (
                <View key={index} style={[{width: (width) / 3 }, {height: (width) 
                    /3},{marginBottom: 2},
                        index % 3 !==0 ? {paddingLeft:2} : {paddingLeft: 0}
            ]}>
                <Image style={{flex: 1, width: undefined, height: undefined}}
                source={image}>

                </Image>
            </View>
            )
        })
    }
    renderSection =() => {
        if(this.state.activeIndex == 0){
            return (
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {this.renderSectionOne()}
                </View>
            )
        }
    }*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        borderBottomWidth: 1,
    
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: {height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        color: "#333",
        paddingBottom: 15,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: "#454D65",
        shadowOffset: {height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.1,
    },

    posts: {
        paddingLeft: 15,
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 5,
        fontSize: 10,
    },
    followers: {
        paddingLeft: 4,
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        fontSize: 10,
    },
    following: {
        paddingLeft: 4,
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        fontSize: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        
    },
    appOutline: {
        width: 25,
        height: 25,
        borderRadius: 10,
        justifyContent: 'space-evenly',
        margin: 30,
        
    },
    photo: {
        width: 75,
        height: 75,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 1,
        justifyContent: 'space-evenly',
        margin: 1,
        
    },
    welcomeMessage: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    contentText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    search:{
        fontSize: 12,
        color: '#333',
        height: 30,
    },
});

export default Profile;