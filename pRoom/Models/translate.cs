using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pRoom.Models
{
    public   class TranslateMD
    {
        public string Direction { get; set; }
        public string name { get; set; }
        public string password { get; set; }
        public string record { get; set; }
        public string Description { get; set; }
        public string duration { get; set; }
        public string Minutes { get; set; }
        public string userCount { get; set; }
        public string startTime { get; set; }
        public string ShareLink { get; set; }
        public   string userManager { get; set; }        
        public   string Default { get; set; }
        public string Layout { get; set; }
        public string DesktopShare { get; set; }
        public string QuizzesAndPolls { get; set; }
        public string fileManagement { get; set; }
        public string WhiteBoard { get; set; }
        public string Play { get; set; }
        public string LeaveClass { get; set; }
        public string send { get; set; }
        public string endMeet_LeaveMeet { get; set; }
        public string endMeet_LeaveMeetMessage { get; set; }
        public string endMeet_EndMeet { get; set; }
        public string endMeet_EndMeetMessage { get; set; }
        public string endMeet_EndMeetAttention { get; set; }        
        public string Cancel { get; set; }        
        public string chatPanel { get; set; }
        public string close { get; set; }
        public string fileManagement_PermittedFiles { get; set; }        
        public string fileManagement_FileSelectDescription { get; set; }        
        public string fileManagement_selectFile { get; set; }
        public string fileManagement_startUpload { get; set; }
        public string fileManagement_uploadComplate { get; set; }
        public string EnterMeetMessage { get; set; }        
        public string EnterMeet { get; set; }
        public string device_title { get; set; }
        public string device_selectAudioInputTex { get; set; }
        public string device_selectVideoInputText { get; set; }
        public string device_audioSourceLable { get; set; }
        public string device_videoSourceLable { get; set; }
        public string select { get; set; }
        public string save { get; set; }
        public string option { get; set; }
        public string quiz_create_title { get; set; }
        public string quiz_create_text { get; set; }
        public string quiz_create_optionText { get; set; }
        public string quiz_create_PublishedResults { get; set; }
        public string quiz_create_GetResultdetails { get; set; }
        public string quiz_view_title { get; set; }
        public string quiz_view_rightOptionText { get; set; }
        public string quiz_Result_title { get; set; }

        public string quiz_front_textEmpty { get; set; }
        public string quiz_front_optionEmpty { get; set; }
        public string quiz_front_SendCompleted { get; set; }
        public string quiz_front_sendError { get; set; }
        public string quiz_front_answerSend { get; set; }
        public string quiz_front_showResultTitle { get; set; }
        public string quiz_front_ResultdetailsTitle { get; set; }
        public string quiz_front_publishComplate { get; set; }

        public string microphone { get; set; }
        public string Camera { get; set; }
        public string microphoneAndCameraSettings { get; set; }
        public string Audio { get; set; }
        public string AudioAndCamera { get; set; }
        public string sendMessage { get; set; }
        public string WhiteBoard_pointer { get; set; }
        public string WhiteBoard_ClearWhiteboard { get; set; }
        public string WhiteBoard_ConfirmClear { get; set; }
        public string WhiteBoard_TakePen { get; set; }
        public string WhiteBoard_drawLine { get; set; }
        public string WhiteBoard_drawRectangle { get; set; }
        public string WhiteBoard_drawCircle { get; set; }
        public string WhiteBoard_writeText { get; set; }        
        public string WhiteBoard_takeEraser { get; set; }
        public string WhiteBoard_Thickness { get; set; }
        public string WhiteBoard_Colorpicker { get; set; }
        public string WhiteBoard_formula { get; set; }
        public string WhiteBoard_Undo { get; set; }
        public string WhiteBoard_Redo { get; set; }
        public string WhiteBoard_showPointer { get; set; }
        public string player_title { get; set; }
        public string player_text { get; set; }
        public string player_ContinuePlaying { get; set; }
        public string player_emptyInputMessage { get; set; }
        public string userPermisionTitle { get; set; }       
        public string edit { get; set; }
        public string Person { get; set; }
        public string ServerConnection { get; set; }
        public string connectionLost { get; set; }
        public string home { get; set; }
        public string delete { get; set; }
        public string deleteMessageTitle { get; set; }
        public string front_index_OnlineMeeting { get; set; }
        public string front_index_OnlineTeaching { get; set; }
        public string front_index_WebConference { get; set; }
        public string front_index_LearningManagementSystem { get; set; }
        public string front_index_FullSessionRecording { get; set; }
        public string front_index_CompletelyPersianEnvironment { get; set; }
        public string front_index_AllFacilitiesNeeded { get; set; }
        public string front_index_completelyFree { get; set; }
        public string front_index_demo { get; set; }
        public string front_index_FeatureList { get; set; }
        public string front_index_features_whiteboard { get; set; }
        public string front_index_features_whiteboard_desc { get; set; }
        public string front_index_features_slide { get; set; }
        public string front_index_features_slide_desc { get; set; }
        public string front_index_features_Record { get; set; }
        public string front_index_features_Record_desc { get; set; }
        public string front_index_features_chat { get; set; }
        public string front_index_features_chat_desc { get; set; }
        public string front_index_features_sharing { get; set; }
        public string front_index_features_sharing_desc { get; set; }
        public string front_index_features_videoConference { get; set; }
        public string front_index_features_videoConference_desc { get; set; }
        public string front_index_features_FileSharing { get; set; }
        public string front_index_features_FileSharing_desc { get; set; }
        public string front_index_features_Voice { get; set; }
        public string front_index_features_Voice_desc { get; set; }
        public string front_index_features_polls { get; set; }
        public string front_index_features_polls_desc { get; set; }
        public string front_menu_home { get; set; }
        public string front_menu_yourRoom { get; set; }
        public string front_menu_Install { get; set; }
        public string front_menu_aboutUs { get; set; }
        public string front_menu_ContactUs { get; set; }
        public string front_login_Register { get; set; }
        public string front_login_login { get; set; }
        public string front_login_signout { get; set; }
        public string front_footer { get; set; }
        public string front_footer_Year { get; set; }
        public string front_start_meetName { get; set; }
        
        public string front_start_enterStudent { get; set; }
        public string front_start_enterTeacher { get; set; }
        public string front_start_EnterMeeting { get; set; }
        public string front_start_note { get; set; }
        public string front_start_meetLink { get; set; }
        public string front_start_recordFile { get; set; }
        public string front_start_PasswordIncorrect { get; set; }
        public string front_start_meetNotStart { get; set; }
        public string front_start_username_empty_message { get; set; }
        public string front_start_recordMessage { get; set; }
        public string front_userName { get; set; }
        public string front_create_emptyPassword { get; set; }
        public string front_create_emptyName { get; set; }
        public string front_roomList_yes { get; set; }
        public string front_roomList_no { get; set; }
        public string front_roomList_yourMeetList { get; set; }
        public string front_roomList_createMeet { get; set; }
        public string front_roomList_ShareLinkto { get; set; }
        public string front_user_email { get; set; }
        public string front_user_emailEmpty { get; set; }
        public string front_user_emailIncorrect { get; set; }
        public string front_user_passwordEmpty { get; set; }
        public string front_user_InputIncorrect { get; set; }
        public string front_user_PasswordNotValid { get; set; }
        public string front_user_RegisterSuccessfull { get; set; }
        public string front_user_emailRepetitious { get; set; }
        public string diagram { get; set; }
        public string MathEditor { get; set; }
        public string offic { get; set; }
        public string officSoft { get; set; }
        public string officPanelTitle { get; set; }
        public string fileManagementOffic_PermittedFiles { get; set; }
        public string officSelect { get; set; }        
        public string fileManagementOffic_desc { get; set; }        
        public string DefaultPermission { get; set; }        
        public string Develop { get; set; }
        public string Conference { get; set; }

        public string front_addUser_userName { get; set; }
        public string front_addUser_student { get; set; }
        public string front_addUser_teacher { get; set; }
        public string front_addUser_pageTitle { get; set; }
        public string front_addUser_sendLinkMessage { get; set; }
        public string front_addUser_role { get; set; }
        public string front_addUser_directLink { get; set; }
        public string front_addUser_userList { get; set; }
        public string front_addUser_registerAs { get; set; }
        public string raiseHand { get; set; }


    }
    public static class Translate
    {
        public static TranslateMD t { get; set; }
        public static Dictionary<string, TranslateMD> langDic = new Dictionary<string, TranslateMD>();
        
    }
}
