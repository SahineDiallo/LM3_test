from rest_framework import serializers
from .models import CustomUser 
from phonenumber_field.phonenumber import to_python


REQUIRED_FIELDS_MESSAGES = {
    "email": "L'adresse email doit être renseignée.",
    "first_name": "Le prénom doit être renseigné.",
    "last_name": "Le nom doit être renseigné.",
    "mobile_phone": "Le numéro de téléphone mobile doit être renseigné.",
    "password": "Le mot de passe doit être renseigné."
}


class CustomUserSerializer(serializers.ModelSerializer):
    re_password = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'mobile_phone', 'password', "re_password"]
        extra_kwargs = {
            'email': { 'error_messages': { 'blank': "L'adresse email doit être renseignée.", }},
            'password': {'write_only': True, 'error_messages': {'blank': "Le mot de passe doit être renseigné."}}
        }

    def create(self, validated_data):
        re_password = validated_data.pop('re_password')
        user = CustomUser.objects.create_user(
            email=validated_data.get("email", ""),
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            mobile_phone=validated_data.get("mobile_phone", ""),
            password=validated_data.get("password")
        )
        return user

    def validate(self, data):
        errors = {}
        is_partial = self.context.get('request').method == 'PATCH'
        for field, message in REQUIRED_FIELDS_MESSAGES.items():
            if field not in data and not is_partial:
                errors[field] = message
        

        mobile_phone = data.get('mobile_phone')
        if mobile_phone:
            phone_number = to_python(mobile_phone)
            if phone_number and not phone_number.is_valid():
                errors['mobile_phone'] = "Numéro de téléphone invalide."

        password = data.get('password')
        re_password = data.get('re_password')
        if password and re_password and password != re_password:
            errors['re_password'] = "Les mots de passe ne correspondent pas."

        if errors:
            raise serializers.ValidationError(errors)        
        return data
    

    
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'mobile_phone', 'account_status', "role"]