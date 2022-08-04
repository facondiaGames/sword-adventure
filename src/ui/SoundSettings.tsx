import { IonLabel, IonToggle } from "@ionic/react";
import { StoreService } from "../db-plugin/data-storage-sqlite/StoreService";
import { StoreConstants } from "../db-plugin/StoreConstants";
import { useEffect, useState } from 'react';
import { AudioManager } from "../services/AudioManager";
import { Container } from 'typedi';
import LanguageService from "../services/LanguageService";
import { Translation } from "../config/Translation";

export default function SoundSettings() {
    const storeService = Container.get(StoreService);
    const [soundChecked, setSoundChecked] = useState(undefined);
    const languageService = Container.get(LanguageService);
    const soundText = languageService.translate(Translation.keys.sound);

    useEffect(() => {
        storeService.getItem({key: StoreConstants.settings.sound}).then((value) => {
            setSoundChecked(value === 'true');
        });
    });

    return (
        <div className='flex--horizontal-no-full flex--justify-center flex-align-items--center'>
            <IonToggle checked={soundChecked} onClick={() => {
                const newValue = !soundChecked;
                setSoundChecked(newValue);
                storeService.setItem({key: StoreConstants.settings.sound, value: newValue});
                const audioManager = Container.get(AudioManager);
                audioManager.setVolumeOn(newValue);
            }}/>
            <IonLabel className="font-large">{soundText} {soundChecked === true ? 'on' : 'off'}</IonLabel>
        </div>
    );

}
