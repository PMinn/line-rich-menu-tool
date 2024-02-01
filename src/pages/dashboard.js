import { Input, Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { useSystem } from '@/contexts/System.js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function () {
    const router = useRouter();
    const { theme, setTheme, token, setToken } = useSystem();
    const [richMenus, setRichMenus] = useState([]);

    useEffect(() => {
        if (token) {
            Promise.all([
                fetch("/api/richmenu/list", {
                    method: "post",
                    body: JSON.stringify({ token })
                })
                    .then(response => response.json())
                    .then(response => (response.status ? response.data : Promise.reject(response.message)))
                    .then(response => response.richmenus)
                    .then(async richMenus => await richMenus.map(async richMenu => {
                        const response = await fetch("/api/richmenu/getImage", {
                            method: "post",
                            body: JSON.stringify({ id: richMenu.richMenuId, token })
                        });
                        const json = await response.json();
                        if (json.status) richMenu.image = 'data:image/png;base64,' + json.data;
                        return richMenu;
                    }))
                    .then(richMenus => Promise.all(richMenus)),
                fetch("/api/richmenu/getDefault", {
                    method: "post",
                    body: JSON.stringify({ token })
                })
                    .then(response => response.json())
                    .then(response => (response.status ? response.data : Promise.reject(response.message)))
                    .then(response => response.richMenuId)
            ])
                .then(response => {
                    let menus = response[0];
                    for (let i = 0; i < menus.length; i++) {
                        if (menus[i].richMenuId === response[1]) {
                            menus[i].isDefault = true;
                            break;
                        }
                    }
                    console.log(response);
                    setRichMenus(menus);
                })
        }
    }, [token]);

    return (
        <main className="gap-2 grid grid-cols-2 md:grid-cols-4 p-5">
            {
                richMenus.map((richMenu, index) => {
                    return (
                        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt=""
                                    className="aspect-square object-cover h-[200px]"
                                    src={richMenu.image}
                                />
                            </CardBody>
                            <CardFooter className="text-small justify-between">
                                <b>{richMenu.isDefault ? "[預設] " : ""}{richMenu.name}</b>
                                <p className="text-default-500">{richMenu.size.width} x {richMenu.size.height}</p>
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </main>
    )
}