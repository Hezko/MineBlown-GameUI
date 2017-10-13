import React from 'react';
import { Link, withRouter, Route } from 'react-router-dom';

const settings = [
    {
        name: 'beginner',
        displayName: 'Beginner',
        width: 10,
        height: 10,
        minesCount: 10,
    },
    {
        name: 'intermediate',
        displayName: 'Intermediate',
        width: 16,
        height: 16,
        minesCount: 40,
    },
    {
        name: 'expert',
        displayName: 'Expert',
        width: 30,
        height: 16,
        minesCount: 99,
    }
];

class Settings extends React.Component {
    constructor(props) {
        super();

        this.state = {
            isSubmitEnabled: true,
            selectedOption: settings[0].name,
            settings: settings[0],
            customSettings: {
                width: 10,
                height: 10,
                minesCount: 10,
            }
        };
    }

    handleOptionChange(changeEvent, height, width, minesCount) {
        this.setState({
            selectedOption: changeEvent.target.value,
            settings: {
                width: width,
                height: height,
                minesCount: minesCount,
            },
        });
    }

    handleFormSubmit(formSubmitEvent, history) {
        this.setState({ isSubmitEnabled: false });
        let promise = this.props.newGameGenerator(this.state.settings.height, this.state.settings.width, this.state.settings.minesCount)
            .then(() => this.setState({ isSubmitEnabled: true }))
            .catch(() => this.setState({ isSubmitEnabled: true }));
    }

    updateInputValue(event, propName) {
        let newSettings = this.state.settings || {};
        newSettings[propName] = event.target.value;

        let customSettings = this.state.customSettings || {};
        customSettings[propName] = event.target.value;
        const stateUpdate = {
            settings: newSettings,
            customSettings: customSettings,
        };
        this.setState(stateUpdate);
    }

    getSettingClassName(setting) {
        let result = 'sidebar-element';
        if (this.state.selectedOption === setting.name) {
            result += ' sidebar-button-active no-border';
        }
        else {
            result += ' outer-border header-button';
        }
        return result;
    }

    render() {

        let isCustomChecked = this.state.selectedOption === 'custom';

        const submitButton =
            <Route render={({ history }) => (
                <button
                    className='sidebar-submit-button'
                    type="submit"
                    onClick={() => this.handleFormSubmit({}, history)}
                    disabled={!this.state.isSubmitEnabled}>
                    Start
                </button>
            )} />

        return (
            <div className='sidebar outer-border'>
                <div className='inner-border'>
                    {settings.map(setting => {
                        const classString = this.getSettingClassName(setting);
                        return (
                            <button className={classString}
                                key={'but_' + setting.name}
                                value={setting.name}
                                onClick={(changeEvent) => this.handleOptionChange(changeEvent, setting.height, setting.width, setting.minesCount)} >
                                {setting.displayName}
                            </button>
                        )
                    })}

                    {/*<div key='div_custom' className='game-setting'>
                        <label>
                            <input type='radio' value='custom'
                                checked={this.state.selectedOption === 'custom'}
                                onChange={(changeEvent) =>
                                    this.handleOptionChange(changeEvent,
                                        this.state.customSettings.height || 0,
                                        this.state.customSettings.width || 0,
                                        this.state.customSettings.minesCount) || 0} >

                            </input>
                            Custom
      </label>
                        <table className='custom-game-settings-table'>
                            <tbody>
                                <tr>
                                    <td>Width:</td>
                                    <td><input className='custom-setting-checkbox'
                                        type='text'
                                        disabled={isCustomChecked === false}
                                        onChange={(event) => this.updateInputValue(event, 'width')} /></td>
                                </tr>
                                <tr>
                                    <td>Height:</td>
                                    <td><input className='custom-setting-checkbox'
                                        type='text'
                                        disabled={isCustomChecked === false}
                                        onChange={(event) => this.updateInputValue(event, 'height')} /></td>
                                </tr>
                                <tr>
                                    <td>Mines:</td>
                                    <td><input className='custom-setting-checkbox'
                                        type='text'
                                        disabled={isCustomChecked === false}
                                        onChange={(event) => this.updateInputValue(event, 'minesCount')} /><br /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>*/}

                    {submitButton}
                </div>
            </div >
        )
    }
}

export default Settings;